const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { contactService, emailService } = require('../services');

const contact = catchAsync(async (req, res) => {
  const contactResponse = await contactService.contact(req.body);
  emailService.sendContactEmail(req.body);
  emailService.sendMarketingEmail(req.body);
  res.status(httpStatus.CREATED).send(contactResponse);
});

module.exports = {
  contact,
};
