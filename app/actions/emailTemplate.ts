export function getContactEmailHtml(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>New Contact Request</title>
</head>
<body style="margin:0; padding:0; width:100%; background:#030405; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#f8fafc; -webkit-font-smoothing:antialiased;">
  
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent; visibility:hidden;">New message received through your portfolio website.</div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; margin:0; padding:0; background:#030405;">
    <tr>
      <td align="center" style="padding:38px 20px 50px 20px; background:#030405;">
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; max-width:620px; margin:0 auto;">
          
          <!-- BRAND HEADER -->
          <tr>
            <td style="padding:0 0 24px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <span style="color:#f4f5f6; font-size:16px; line-height:1; font-weight:650; letter-spacing:-0.35px;">Portfolio<span style="color:#078c8c;">.</span></span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="color:#59616a; font-size:9px; line-height:1; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">Contact</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HEADER DIVIDER -->
          <tr><td style="height:1px; background:#1c2024; font-size:0; line-height:0;">&nbsp;</td></tr>

          <!-- INTRO -->
          <tr>
            <td align="left" style="padding:42px 4px 30px 4px;">
              <div style="display:inline-block; margin-bottom:15px; padding:6px 10px; border:1px solid #292d31; border-radius:999px; background:#0c0e10; color:#8d969f; font-size:9px; line-height:1; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">New Message</div>
              <h1 style="margin:0 0 12px 0; color:#f7f8f9; font-size:29px; line-height:1.18; font-weight:700; letter-spacing:-0.9px;">You have a new<br>contact request.</h1>
              <p style="margin:0; max-width:470px; color:#747d87; font-size:14px; line-height:1.7;">Someone reached out through your portfolio. Here’s everything they sent you.</p>
            </td>
          </tr>

          <!-- BLACK STEEL MAIN CARD -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; background:#181b1e; background:linear-gradient(135deg, #181b1e 0%, #030405 100%); border:2px solid #292d31; border-radius:18px; overflow:hidden;">
                
                <!-- CARD TOP (SENDER DETAILS) -->
                <tr>
                  <td style="padding:28px 28px 26px 28px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding:0 0 20px 0;">
                          <div style="margin-bottom:7px; color:#747d86; font-size:9px; line-height:1; font-weight:700; letter-spacing:1.6px; text-transform:uppercase;">From</div>
                          <div style="color:#f5f6f7; font-size:17px; line-height:1.4; font-weight:600; letter-spacing:-0.2px;">${name}</div>
                        </td>
                      </tr>
                      <tr><td style="height:1px; background:#292d31; font-size:0; line-height:0;">&nbsp;</td></tr>
                      <tr>
                        <td style="padding:20px 0 0 0;">
                          <div style="margin-bottom:7px; color:#747d86; font-size:9px; line-height:1; font-weight:700; letter-spacing:1.6px; text-transform:uppercase;">Email</div>
                          <a href="mailto:${email}" style="color:#3bc2c2; font-size:14px; line-height:1.5; font-weight:500; text-decoration:none; word-break:break-word;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- MESSAGE HEADER -->
                <tr>
                  <td style="padding:18px 28px; border-top:1px solid #292d31; background:rgba(0,0,0,0.18);">
                    <span style="color:#747d86; font-size:9px; line-height:1; font-weight:700; letter-spacing:1.6px; text-transform:uppercase;">Message</span>
                  </td>
                </tr>

                <!-- MESSAGE BODY -->
                <tr>
                  <td style="padding:0 28px 28px 28px;">
                    <div style="padding:19px 20px; background:#050607; border:1px solid #292d31; border-radius:10px; color:#d7dce1; font-size:14px; line-height:1.8; word-break:break-word;">
                      ${message.replace(/\n/g, '<br>')}
                    </div>
                  </td>
                </tr>

                <!-- REPLY CTA -->
                <tr>
                  <td style="padding:0 28px 28px 28px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="center" style="border-radius:8px; background:#078c8c;">
                          <a href="mailto:${email}" style="display:inline-block; padding:11px 18px; color:#ffffff; font-size:12px; line-height:1; font-weight:650; text-decoration:none; border-radius:8px;">Reply to ${name}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding:28px 20px 0 20px;">
              <p style="margin:0 0 7px 0; color:#505861; font-size:11px; line-height:1.6;">Sent automatically from your portfolio website.</p>
              <p style="margin:0; color:#363c42; font-size:10px; line-height:1.6;">© ${new Date().getFullYear()} Sameer Shahid Siddiqui</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
