def find_sentence_with_keywords(doc, query):
    keywords = query.lower().split() 
    for sent in doc.sents:
        sentence_text = sent.text.lower()
        if all(keyword in sentence_text for keyword in keywords):
            return sent.text
    return None

def generate_response(user_msg):
    from mistralai import Mistral, UserMessage, SystemMessage

    token = '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'
    endpoint = "https://models.inference.ai.azure.com"
    model_name = "Mistral-small"

    client = Mistral(api_key=token, server_url=endpoint)


    response = client.chat.complete(
        model=model_name,
        messages=[
            SystemMessage(content="Ti si pomoćnik koji odgovara na pitanje o IPI akademiji. Odgovaraj na bosanskom jeziku."),
            UserMessage(content=user_msg),
        ],
        #temperatura dize se bura
        temperature=0.8,
        max_tokens=1000,
        top_p=1.0
    )
    return response.choices[0].message.content
