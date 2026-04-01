export const mockTransporter = {
    verify: jest.fn().mockResolvedValueOnce(true),
    sendMail: jest.fn().mockResolvedValueOnce({ messageId: "fake_message_id" }),
};

export const mockNodemailer = {
    createTransport: jest.fn().mockReturnValue(mockTransporter),
};