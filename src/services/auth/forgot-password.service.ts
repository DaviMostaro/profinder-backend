import {db} from "../../db";
import {eq} from "drizzle-orm";
import {users} from "../../db/schema";
import {UserNotFoundError} from "../../errors/user-not-found.error";
import {generateResetToken} from "./generate-reset-token.service";
import {env} from "../../env";
import nodemailer from "nodemailer";

export async function forgotPasswordService(email: string){
    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if(!user){
        throw new UserNotFoundError();
    }

    const resetToken = generateResetToken(email, user.id);
    const resetUrl = `${env.FRONTEND_URL}/${user.id}/${resetToken}`;

    const transporter = nodemailer.createTransport({
        host: env.BREVO_SMTP_HOST,
        port: Number(env.BREVO_SMTP_PORT),
        secure: false,
        auth: {
            user: env.BREVO_SMTP_USER,
            pass: env.BREVO_SMTP_PASS,
        }
    });

    await transporter.verify();

    const mailOptions = {
        from: "cauanlorenz06@gmail.com",
        to: user.email,
        subject: "Redefinição de senha",
        text: "Você solicitou a redefinição da sua senha",
        html: `
      <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; text-align: center; padding: 40px;">  
        <!-- Título -->
        <h1 style="color: #000000; font-size: 24px; margin-bottom: 20px;">REDEFINIÇÃO DE SENHA</h1>
        
        <!-- Texto explicativo -->
        <p style="color: #333333; font-size: 16px; margin-bottom: 20px;">
          Você solicitou a redefinição da sua senha? Clique no botão abaixo para redefini-la
        </p>
        
        <!-- Botão -->
        <a href="${resetUrl}" 
           style="display: inline-block; background-color: #51446f; color: #ffffff; 
                  padding: 15px 20px; border-radius: 8px; text-decoration: none; 
                  font-size: 16px;">
          clique aqui para redefinir sua senha
        </a>
      </div>
    `,
    };

    const mailSender = await transporter.sendMail(mailOptions);
    return { resetUrl, mailOptions, mailSender };

}