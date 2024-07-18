import OpenAI from "openai";
import dotenv from 'dotenv';

const openai = new OpenAI({
    apiKey:(import.meta.env.VITE_OPENAI_API_KEY),

    dangerouslyAllowBrowser: true ,
});

export async function sendToOpenAI(blessing) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
            },
            {
                role: "user",
                content: blessing,
            },
        ],
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;


}
