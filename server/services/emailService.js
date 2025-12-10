const formData = require('form-data');
const Mailgun = require('mailgun.js');

// Email settings store (will be updated from admin panel)
let emailSettings = {
    mailgunApiKey: process.env.MAILGUN_API_KEY || '',
    mailgunDomain: process.env.MAILGUN_DOMAIN || '',
    fromEmail: process.env.FROM_EMAIL || 'Old Arcade <noreply@old-arcade.com>',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@old-arcade.com',
    enabled: false
};

// Update settings
const updateEmailSettings = (settings) => {
    emailSettings = { ...emailSettings, ...settings };
    console.log('[Email] Settings updated:', { 
        domain: emailSettings.mailgunDomain, 
        enabled: emailSettings.enabled,
        adminEmail: emailSettings.adminEmail
    });
};

// Get settings
const getEmailSettings = () => ({
    mailgunDomain: emailSettings.mailgunDomain,
    fromEmail: emailSettings.fromEmail,
    adminEmail: emailSettings.adminEmail,
    enabled: emailSettings.enabled,
    hasApiKey: !!emailSettings.mailgunApiKey
});

// Get Mailgun client
const getMailgunClient = () => {
    if (!emailSettings.mailgunApiKey || !emailSettings.mailgunDomain) {
        return null;
    }
    const mailgun = new Mailgun(formData);
    return mailgun.client({ username: 'api', key: emailSettings.mailgunApiKey });
};

// Base email template
const getEmailTemplate = (content, title = 'Old Arcade') => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0f; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #12121a 0%, #1a1a2e 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(168,85,247,0.2);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(34,211,238,0.1));">
                            <div style="display: inline-block; padding: 16px 24px; background: linear-gradient(135deg, #a855f7, #22d3ee); border-radius: 16px; margin-bottom: 16px;">
                                <span style="font-size: 28px; font-weight: 800; color: white; letter-spacing: -1px;">OLD ARCADE</span>
                            </div>
                            <p style="color: #8b8b9e; font-size: 14px; margin: 0;">Premium Retro Gaming</p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            ${content}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(168,85,247,0.1);">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="color: #6b6b7e; font-size: 12px; margin: 0 0 10px;">
                                            © ${new Date().getFullYear()} Old Arcade - Retro Arcade Co LTD
                                        </p>
                                        <p style="color: #6b6b7e; font-size: 12px; margin: 0;">
                                            7 Llewellyn Close, Stourport-On-Severn, England, DY13 9RH
                                        </p>
                                        <p style="margin: 15px 0 0;">
                                            <a href="https://old-arcade.com" style="color: #a855f7; text-decoration: none; font-size: 12px;">Visit Our Store</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// Send email function
const sendEmail = async (to, subject, htmlContent) => {
    if (!emailSettings.enabled) {
        console.log('[Email] Emails disabled, skipping:', subject);
        return { success: false, reason: 'disabled' };
    }

    const client = getMailgunClient();
    if (!client) {
        console.log('[Email] Mailgun not configured, skipping:', subject);
        return { success: false, reason: 'not_configured' };
    }

    try {
        const result = await client.messages.create(emailSettings.mailgunDomain, {
            from: emailSettings.fromEmail,
            to: [to],
            subject: subject,
            html: htmlContent
        });
        console.log('[Email] Sent successfully to:', to, 'Subject:', subject);
        return { success: true, id: result.id };
    } catch (error) {
        console.error('[Email] Failed to send:', error.message);
        return { success: false, error: error.message };
    }
};

// ==================== EMAIL TEMPLATES ====================

// Order Confirmation Email (to customer)
const sendOrderConfirmation = async (order) => {
    const itemsHtml = order.items.map(item => `
        <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid rgba(168,85,247,0.1);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="60" style="padding-right: 15px;">
                            <img src="${item.image_url || 'https://via.placeholder.com/60'}" alt="${item.title}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
                        </td>
                        <td>
                            <p style="color: #ffffff; font-weight: 600; margin: 0 0 5px;">${item.title}</p>
                            <p style="color: #8b8b9e; font-size: 13px; margin: 0;">Qty: ${item.quantity}</p>
                        </td>
                        <td style="text-align: right;">
                            <p style="color: #22c55e; font-weight: 600; margin: 0;">£${(item.price * item.quantity).toFixed(2)}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `).join('');

    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">Order Confirmed! 🎮</h1>
        <p style="color: #8b8b9e; text-align: center; margin: 0 0 30px;">Thank you for your order</p>
        
        <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
            <p style="color: #8b8b9e; font-size: 13px; margin: 0 0 5px;">Order Number</p>
            <p style="color: #22c55e; font-size: 24px; font-weight: 700; margin: 0;">#${order.id}</p>
        </div>

        <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 15px;">Order Details</h2>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
            ${itemsHtml}
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(168,85,247,0.1); border-radius: 12px; padding: 20px;">
            <tr>
                <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                            <td style="padding: 8px 0;"><span style="color: #8b8b9e;">Subtotal</span></td>
                            <td style="text-align: right;"><span style="color: #ffffff;">£${(order.total / 100 - 3.99).toFixed(2)}</span></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;"><span style="color: #8b8b9e;">Shipping</span></td>
                            <td style="text-align: right;"><span style="color: #ffffff;">£3.99</span></td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0 0; border-top: 1px solid rgba(168,85,247,0.2);"><span style="color: #ffffff; font-weight: 700; font-size: 18px;">Total</span></td>
                            <td style="text-align: right; padding: 12px 0 0; border-top: 1px solid rgba(168,85,247,0.2);"><span style="color: #a855f7; font-weight: 700; font-size: 18px;">£${(order.total / 100).toFixed(2)}</span></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <div style="margin-top: 30px;">
            <h2 style="color: #ffffff; font-size: 18px; margin: 0 0 15px;">Shipping Address</h2>
            <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
                <p style="color: #ffffff; margin: 0 0 5px; font-weight: 600;">${order.customer_name}</p>
                <p style="color: #8b8b9e; margin: 0; line-height: 1.6;">${order.shipping_address?.replace(/\n/g, '<br>')}</p>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <a href="https://old-arcade.com/track-order" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">Track Your Order</a>
        </div>
    `;

    return sendEmail(order.customer_email, `Order Confirmed #${order.id} - Old Arcade`, getEmailTemplate(content, 'Order Confirmation'));
};

// New Order Alert (to admin)
const sendNewOrderAlert = async (order) => {
    const itemsList = order.items.map(item => `• ${item.title} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}`).join('<br>');
    
    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">New Order Received! 💰</h1>
        
        <div style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td><span style="color: #8b8b9e;">Order ID:</span></td>
                    <td style="text-align: right;"><span style="color: #a855f7; font-weight: 700;">#${order.id}</span></td>
                </tr>
                <tr>
                    <td style="padding-top: 10px;"><span style="color: #8b8b9e;">Total:</span></td>
                    <td style="text-align: right; padding-top: 10px;"><span style="color: #22c55e; font-weight: 700; font-size: 20px;">£${(order.total / 100).toFixed(2)}</span></td>
                </tr>
            </table>
        </div>

        <h2 style="color: #ffffff; font-size: 16px; margin: 25px 0 10px;">Customer Details</h2>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <p style="color: #ffffff; margin: 0 0 5px;"><strong>${order.customer_name}</strong></p>
            <p style="color: #8b8b9e; margin: 0 0 5px;">${order.customer_email}</p>
            <p style="color: #8b8b9e; margin: 0; line-height: 1.6;">${order.shipping_address?.replace(/\n/g, '<br>')}</p>
        </div>

        <h2 style="color: #ffffff; font-size: 16px; margin: 25px 0 10px;">Items Ordered</h2>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <p style="color: #8b8b9e; margin: 0; line-height: 1.8;">${itemsList}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <a href="https://old-arcade.com/admin/dashboard" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">View in Admin Panel</a>
        </div>
    `;

    return sendEmail(emailSettings.adminEmail, `🛒 New Order #${order.id} - £${(order.total / 100).toFixed(2)}`, getEmailTemplate(content, 'New Order'));
};

// Order Status Update (to customer)
const sendOrderStatusUpdate = async (order, newStatus, additionalInfo = {}) => {
    const statusConfig = {
        'Processing': { emoji: '⏳', color: '#eab308', message: 'We are preparing your order for shipment.' },
        'Shipped': { emoji: '📦', color: '#22d3ee', message: 'Your order is on its way!' },
        'Delivered': { emoji: '✅', color: '#22c55e', message: 'Your order has been delivered. Enjoy!' },
        'Cancelled': { emoji: '❌', color: '#ef4444', message: 'Your order has been cancelled.' }
    };

    const config = statusConfig[newStatus] || { emoji: '📋', color: '#a855f7', message: 'Your order status has been updated.' };

    let trackingHtml = '';
    if (newStatus === 'Shipped' && additionalInfo.tracking_id) {
        trackingHtml = `
            <div style="background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.3); border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
                <p style="color: #8b8b9e; font-size: 13px; margin: 0 0 5px;">Tracking Number</p>
                <p style="color: #22d3ee; font-size: 20px; font-weight: 700; margin: 0 0 10px;">${additionalInfo.tracking_id}</p>
                ${additionalInfo.courier ? `<p style="color: #8b8b9e; font-size: 13px; margin: 0;">Courier: ${additionalInfo.courier}</p>` : ''}
            </div>
        `;
    }

    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">Order Update ${config.emoji}</h1>
        <p style="color: #8b8b9e; text-align: center; margin: 0 0 30px;">Order #${order.id}</p>
        
        <div style="background: rgba(168,85,247,0.1); border-radius: 16px; padding: 30px; text-align: center; margin-bottom: 25px;">
            <div style="display: inline-block; padding: 12px 30px; background: ${config.color}20; border: 2px solid ${config.color}; border-radius: 50px;">
                <span style="color: ${config.color}; font-weight: 700; font-size: 18px;">${newStatus}</span>
            </div>
            <p style="color: #8b8b9e; margin: 20px 0 0; font-size: 15px;">${config.message}</p>
        </div>

        ${trackingHtml}

        <div style="text-align: center; margin-top: 30px;">
            <a href="https://old-arcade.com/track-order" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">Track Your Order</a>
        </div>
    `;

    return sendEmail(order.customer_email, `Order #${order.id} - ${newStatus}`, getEmailTemplate(content, 'Order Update'));
};

// Support Ticket Created (to customer)
const sendTicketCreatedCustomer = async (ticket) => {
    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">Support Ticket Created 🎫</h1>
        <p style="color: #8b8b9e; text-align: center; margin: 0 0 30px;">We've received your message</p>
        
        <div style="background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;">
            <p style="color: #8b8b9e; font-size: 13px; margin: 0 0 5px;">Ticket ID</p>
            <p style="color: #a855f7; font-size: 24px; font-weight: 700; margin: 0;">#${ticket.id}</p>
        </div>

        <h2 style="color: #ffffff; font-size: 16px; margin: 0 0 10px;">Subject</h2>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #ffffff; margin: 0;">${ticket.subject}</p>
        </div>

        <h2 style="color: #ffffff; font-size: 16px; margin: 0 0 10px;">Your Message</h2>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <p style="color: #8b8b9e; margin: 0; line-height: 1.6;">${ticket.messages[0]?.message || ''}</p>
        </div>

        <p style="color: #8b8b9e; text-align: center; margin: 30px 0 0; font-size: 14px;">
            Our support team will respond within 24 hours.
        </p>

        <div style="text-align: center; margin-top: 20px;">
            <a href="https://old-arcade.com/support" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">View Your Tickets</a>
        </div>
    `;

    return sendEmail(ticket.email, `Support Ticket #${ticket.id} - ${ticket.subject}`, getEmailTemplate(content, 'Support Ticket'));
};

// Support Ticket Created (to admin)
const sendTicketCreatedAdmin = async (ticket) => {
    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">New Support Ticket 🎫</h1>
        
        <div style="background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td><span style="color: #8b8b9e;">Ticket ID:</span></td>
                    <td style="text-align: right;"><span style="color: #eab308; font-weight: 700;">#${ticket.id}</span></td>
                </tr>
                <tr>
                    <td style="padding-top: 10px;"><span style="color: #8b8b9e;">Status:</span></td>
                    <td style="text-align: right; padding-top: 10px;"><span style="color: #eab308; font-weight: 600;">Open</span></td>
                </tr>
            </table>
        </div>

        <h2 style="color: #ffffff; font-size: 16px; margin: 25px 0 10px;">Customer</h2>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <p style="color: #ffffff; margin: 0 0 5px;"><strong>${ticket.name}</strong></p>
            <p style="color: #8b8b9e; margin: 0;">${ticket.email}</p>
        </div>

        <h2 style="color: #ffffff; font-size: 16px; margin: 25px 0 10px;">Subject</h2>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <p style="color: #ffffff; margin: 0;">${ticket.subject}</p>
        </div>

        <h2 style="color: #ffffff; font-size: 16px; margin: 25px 0 10px;">Message</h2>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px;">
            <p style="color: #8b8b9e; margin: 0; line-height: 1.6;">${ticket.messages[0]?.message || ''}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <a href="https://old-arcade.com/admin/dashboard" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">Reply in Admin Panel</a>
        </div>
    `;

    return sendEmail(emailSettings.adminEmail, `🎫 New Ticket #${ticket.id} - ${ticket.subject}`, getEmailTemplate(content, 'New Ticket'));
};

// Support Ticket Reply (to customer)
const sendTicketReply = async (ticket, message) => {
    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">New Reply on Ticket #${ticket.id} 💬</h1>
        <p style="color: #8b8b9e; text-align: center; margin: 0 0 30px;">${ticket.subject}</p>
        
        <div style="background: rgba(168,85,247,0.1); border-radius: 16px; padding: 25px; margin-bottom: 25px;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); border-radius: 50%; display: inline-block;"></div>
                <div style="margin-left: 12px;">
                    <p style="color: #ffffff; margin: 0; font-weight: 600;">Support Team</p>
                    <p style="color: #8b8b9e; margin: 0; font-size: 12px;">${new Date(message.timestamp).toLocaleString('en-GB')}</p>
                </div>
            </div>
            <p style="color: #ffffff; margin: 0; line-height: 1.6; padding-left: 52px;">${message.message}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <a href="https://old-arcade.com/support" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">View & Reply</a>
        </div>
    `;

    return sendEmail(ticket.email, `Reply on Ticket #${ticket.id} - ${ticket.subject}`, getEmailTemplate(content, 'Ticket Reply'));
};

// Welcome Email (when user registers)
const sendWelcomeEmail = async (user) => {
    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">Welcome to Old Arcade! 🎮</h1>
        <p style="color: #8b8b9e; text-align: center; margin: 0 0 30px;">Your account has been created</p>
        
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #a855f7, #22d3ee); border-radius: 50%; display: inline-block; line-height: 80px;">
                <span style="font-size: 36px;">👾</span>
            </div>
        </div>

        <p style="color: #ffffff; text-align: center; font-size: 16px; margin: 0 0 30px;">
            Hey ${user.name || 'Gamer'}! Welcome to the ultimate destination for retro gaming.
        </p>

        <div style="background: rgba(168,85,247,0.1); border-radius: 16px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #ffffff; font-size: 16px; margin: 0 0 15px; text-align: center;">What you can do:</h2>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr><td style="padding: 8px 0; color: #8b8b9e;">✓ Browse our premium collection</td></tr>
                <tr><td style="padding: 8px 0; color: #8b8b9e;">✓ Add items to your favourites</td></tr>
                <tr><td style="padding: 8px 0; color: #8b8b9e;">✓ Track your orders</td></tr>
                <tr><td style="padding: 8px 0; color: #8b8b9e;">✓ Get exclusive member discounts</td></tr>
            </table>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <a href="https://old-arcade.com/shop" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #a855f7, #22d3ee); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">Start Shopping</a>
        </div>
    `;

    return sendEmail(user.email, `Welcome to Old Arcade! 🎮`, getEmailTemplate(content, 'Welcome'));
};

// Test email
const sendTestEmail = async (to) => {
    const content = `
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 10px; text-align: center;">Test Email ✅</h1>
        <p style="color: #8b8b9e; text-align: center; margin: 0 0 30px;">Your Mailgun integration is working!</p>
        
        <div style="background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 12px; padding: 30px; text-align: center;">
            <p style="color: #22c55e; font-size: 48px; margin: 0 0 15px;">🎉</p>
            <p style="color: #ffffff; font-size: 18px; margin: 0;">Email configuration successful!</p>
            <p style="color: #8b8b9e; font-size: 14px; margin: 10px 0 0;">Sent at: ${new Date().toLocaleString('en-GB')}</p>
        </div>
    `;

    return sendEmail(to, 'Test Email - Old Arcade', getEmailTemplate(content, 'Test Email'));
};

module.exports = {
    updateEmailSettings,
    getEmailSettings,
    sendEmail,
    sendOrderConfirmation,
    sendNewOrderAlert,
    sendOrderStatusUpdate,
    sendTicketCreatedCustomer,
    sendTicketCreatedAdmin,
    sendTicketReply,
    sendWelcomeEmail,
    sendTestEmail
};
