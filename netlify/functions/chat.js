export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.HF_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:fastest",
          messages: [
            {
              role: "user",
              content: body.message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("HF RESPONSE:", data); // 👈 IMPORTANT

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "No response 😅"
      })
    };

  } catch (err) {
    console.error("REAL ERROR:", err); // 👈 THIS IS WHAT WE NEED

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message // 👈 show real error
      })
    };
  }
}
