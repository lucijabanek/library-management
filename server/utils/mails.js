
exports.membershipExpirationXDays = {
  subject: 'Membership Expiration',

  body: `
    <p>Hello {{username}},<br>
    
    Your Membership is expiring in {{days}} day/s.<br>

    If you want to continue using Library service, please contact one of the employees.</p>`
};

exports.membershipExpirationToday = {
  subject: 'Membership Expiration',

  body: `
    <p>Hello {{username}},<br>
        
    Your Membership has expired.<br>

    If you want to continue using Library service, please contact one of the employees.</p>`

};

exports.oneDayReminderEmail = {
  subject: 'Book due date tomorrow',
  body: `
  <p>Hello {{username}},<br>

  The book {{bookName}} is due to be returned tomorrow.<br>

  After tomorrow, a daily late fee will be charged with price of {{price}} \u20ac per day.</p>`
};

exports.dueDateEmail = {
  subject: 'Book due date today',

  body: `
  <p>Hello {{username}},<br>

  The book {{bookName}} is due to be returned today.<br>

  After today, a daily late fee will be charged with price of {{price}} \u20ac per day.</p>`
};

exports.dueDateExceededEmail = {
  subject: 'Book due date exceeded',

  body: `
  <p>Hello {{username}},<br>

  The book {{bookName}} was due on {{expiredDate}}.<br>

  A daily late fee is being charged with price of {{price}} \u20ac per day.<br>

  Your current late fee is {{lateFee}} \u20ac.</p>`
};

exports.passwordReset = {
  subject: 'YOUR PASSWORD RESET LINK IS READY',

  body:
  `
  <p>Hello {{username}},<br>
        
  Your password reset link is ready!<br>
 
  Just click the link to reset it – but be quick, it expires in 15 minutes.</p>

  <a href="{{baseurl}}/user/password-create?token={{token}}&user={{userId}}&email={{email}}">Reset password</a>
  `
};

exports.passwordChangeSuccess = {
  subject: 'YOU PASSWORD HAS BEEN CHANGED',

  body: `
    <p>Hello,<br>
        
    This message is just a reminder that your password has been changed.<br>
   
    If this action was not taken by you,  please contact one of the employees!</p>
  `
};

exports.passwordReset = {
  subject: 'YOUR PASSWORD RESET LINK IS READY',

  body:
  `
  <p>Hello {{username}},<br>
        
  Your password reset link is ready!<br>
 
  Just click the link to reset it – but be quick, it expires in 15 minutes.</p>

  <a href="{{baseurl}}/user/password-create?token={{token}}&user={{userId}}&email={{email}}">Reset password</a>
  `
};

exports.passwordChangeSuccess = {
  subject: 'YOU PASSWORD HAS BEEN CHANGED',

  body: `
    <p>Hello,<br>
        
    This message is just a reminder that your password has been changed.<br>
   
    If this action was not taken by you,  please contact one of the employees!</p>
  `
};
