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
    const responseMessage = JSON.parse(completion.choices[0].message.content);
    const message = responseMessage.message;

    return message;
}
// import OpenAI from "openai";
// import dotenv from 'dotenv';

// const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true,
// });

// let cachedResponses = [];

// export async function sendToOpenAI(blessing) {
//     if (cachedResponses.length === 0) {
//         const completions = await openai.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: "מועיל להביא ברכות לאירועים",
//                 },
//                 {
//                     role: "user",
//                     content: blessing,
//                 },
//             ],
//             model: "gpt-3.5-turbo-0125",
//             max_tokens: 150, // כמות האותיות המרבית בתשובה
//             n: 3, // בקש 3 תשובות
//             response_format: { type: "json_object" },
//         });

//         // Extract and parse the message content from each choice
//         cachedResponses = completions.choices.map(choice => {
//             // if(choice.message.content) {
//             //     // return JSON.parse(choice.message.content);
//             // }
//                 return 
//             return null;
//         }).filter(Boolean); // Filter out null values
//     }

// let cachedResponses = [];

// export async function sendToOpenAI(blessing) {
//     if (cachedResponses.length === 0) {
//         const completions = await openai.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are from a helpful Assistant designed to extract JSON data.",
//                 },
//                 {
//                     role: "user",
//                     content: blessing,
//                 },
//             ],
//             model: "gpt-3.5-turbo-0125",
//             max_tokens: 150, // Maximum number of letters in the answer
//             n: 3, // Request 3 answers
//             response_format: { type: "json_object" },
//         });

//         // Store the completions directly in the cachedResponses array
//         cachedResponses = completions.choices.map(choice => {
//             return choice.message;
//         });
//     }

//     // Return the first response from the cached responses
//     return cachedResponses.shift();
// }




// import OpenAI from "openai";
// import dotenv from 'dotenv';

// const openai = new OpenAI({
//     apiKey: (import.meta.env.VITE_OPENAI_API_KEY),
//     dangerouslyAllowBrowser: true,
// });

// let cachedResponses = [];

// export async function sendToOpenAI(blessing) {
//     if (cachedResponses.length === 0) {
//         const completions = await openai.chat.completions.create({
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are a helpful assistant designed to output JSON.",
//                 },
//                 {
//                     role: "user",
//                     content: blessing,
//                 },
//             ],
//             model: "gpt-3.5-turbo-0125",
//             max_tokens: 150, // Adjust max_tokens as needed
//             n: 3, // Request 3 completions
//             response_format: { type: "json_object" },
//         });

//         cachedResponses = completions.choices.map(choice => JSON.parse(choice.message.content));
//     }

//     // Return the first response from the cached responses
//     return cachedResponses.shift().message;
// }