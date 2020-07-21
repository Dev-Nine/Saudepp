import { Request, Response } from 'express';
import {getRepository} from 'typeorm';
import * as nodemailer from 'nodemailer';
import escape from 'pg-escape'
import { User } from '../model/User';
import { RecoverHistory } from '../model/RecoverHistory';
import bcrypt from 'bcryptjs';
import { Forbidden } from '../Errors';

export async function requestAccount (req: Request, res: Response, next): Promise<any> {
	try {
		const userQueryBuilder = getRepository(User)
			.createQueryBuilder("user")
			.where(escape("email = %L", req.params["email"]));
		
		const user = await userQueryBuilder.getOne();
		
		let mailContent = { subject: '', text: '' };
		if(user){
			var recoverHistory = new RecoverHistory()
			recoverHistory.created_at = new Date();
			recoverHistory.email = req.params["email"];
			const recoverInfo = await getRepository(RecoverHistory).save(recoverHistory);
			mailContent.subject = "Redefinição de senha na plataforma Saúde++"
			mailContent.text = 
				`${user.name}, foi realizada uma solicitação para redefinir a senha` +
				"na plataforma Saúde++. Se não foi você que solicitou, você pode ignorar" +
				"este e-mail, sua conta não está em perigo. Caso tenha sido você, " +
				"clique no link abaixo para redefinir a sua senha.\n\n"+
				`${process.env.SITE_URL}/recover/${recoverInfo.id}`+
				"\n\nPlataforma Saúde++"
		}else{
			mailContent.subject = "Tentativa de redefinição de senha na plataforma Saúde++"
			mailContent.text = 
				"Olá! Foi realizada uma solicitação para redefinir a senha " +
				"na plataforma Saúde++. Entretanto, não há nenhuma conta associada à este " +
				"e-mail. Verifique se você não errou o seu e-mail, e caso esteja correto, " +
				"você deverá entrar em contato conosco para resolver o seu problema.\n\n" +
				"Plataforma Saúde++"
		}
		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.SERVICE_EMAIL,
				pass: process.env.SERVICE_EMAIL_PASSWORD,
			},
		});
		
		const mailOptions = {
			from: process.env.SERVICE_EMAIL,
			to: req.params["email"],
			...mailContent
		}
		let info = await transporter.sendMail(mailOptions);
		return res.status(200).send(info);
	} catch(err) {
		return next(err);
	}
}

export async function redefinePassword (req: Request, res: Response, next): Promise<any> {
	try {
		const recoverInfo = await getRepository(RecoverHistory)
			.createQueryBuilder("recover_history")
			.where(escape("id = %L", req.params["uuid"]))
			.getOne();
		if(recoverInfo){
			// 20 minutos = 1000ms * 60sec * 20min = 1200000ms
			const currentDate = new Date();
			if(currentDate.getTime() - recoverInfo.created_at.getTime() < 1200000){
				const hashedPassword = await bcrypt.hash(req.body["password"], 8);

				const user = await getRepository(User)
				.createQueryBuilder("user")
				.where(escape("email = %L", recoverInfo.email))
				.getOne();

				user.password = hashedPassword;
				await getRepository(User).save(user);
				return res.sendStatus(200);
			}
			return res.sendStatus(404);
		}
		return res.sendStatus(404);	
	} catch(err) {
		return next(err);
	}
}