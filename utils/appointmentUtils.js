const ErrorResponse = require("./errorResponse");
const sendEmail = require("./sendEmail");

exports.sendUserAppointmentEmail = async (appointment) => {
  appointment.name =
    appointment?.name || `${appointment?.firstname} ${appointment?.lastname}`;
  console.log({ appointment });
  const email = appointment?.email;
  const subject = `Appointment Reserved`;
  const salutation = `Hello ${appointment?.firstname || appointment?.name},`;
  const content = `
  <p>Kindly find the details of your appointment below:</p>
  <ul>  
      <li><strong>Service:</strong> ${appointment?.type}</li>
      <li><strong>Date:</strong> ${new Date(
        appointment?.date
      )?.toLocaleString()}</li>
  </ul>`;
  try {
    const response = await sendEmail({ email, subject, salutation, content });
    // console.log({response })
    return [response];
  } catch (err) {
    console.log(err);
    throw new ErrorResponse(
      `Error Sending Appointment Mail: ${err.message}`,
      500
    );
  }
};

exports.sendAdminAppointmentEmail = async (appointment) => {
  appointment.name =
    appointment.name || `${appointment?.firstname} ${appointment?.lastname}`;
  const email = process.env.FROM_EMAIL;
  const subject = `Appointment Reserved`;
  const salutation = `Hello, `;
  const appointmentPhone = appointment?.phone
    ? `<li><strong>Phone:</strong> ${appointment?.phone}</li>`
    : "";
  const content = `
  <p>Kindly be informed that a customer has booked an appointment.</p>
  <p>Kindly find the details of the appointment below:</p>
  <ul>
      <li><strong>Name:</strong> ${appointment?.name}</li>
      <li><strong>Email:</strong> ${appointment?.email}</li>
      <li><strong>Email:</strong> ${appointment?.email}</li>
      ${appointmentPhone}
      <li><strong>Date:</strong> ${new Date(
        appointment?.date
      )?.toLocaleString()}</li>
  </ul>`;
  try {
    const response = await sendEmail({ email, subject, salutation, content });
    // console.log({response })
    return [response];
  } catch (err) {
    console.log(err);
    throw new ErrorResponse(
      `Error Sending Appointment Mail: ${err.message}`,
      500
    );
  }
};

exports.sendAppointmentMails = async (appointment) => {
  // await this.sendUserAppointmentEmail(appointment);
  // await this.sendAdminAppointmentEmail(appointment);
  await Promise.all(
    await this.sendUserAppointmentEmail(appointment),
    await this.sendAdminAppointmentEmail(appointment)
  );
  return [];
};
