import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
	const data = await req.json();
	try {
		const response = await axios.post(
			`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${data.token}`
		);
      
		if (response.data.success) {
			return NextResponse.json({ res: "This is a human user" });
		} else {
			return NextResponse.json({ res: "This is a Robot" });
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({ res: "An Error occurred" });
	}
}
