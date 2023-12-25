export function decodeMessage(
  template: string,
  values: Record<string, string>
): string {
  const regex = /{{\s*(\w+)\s*}}/g;
  const placeholders = template.match(regex);

  if (!placeholders) {
    return template;
  }

  const placeholdersInValues = placeholders.filter((placeholder) =>
    Object.keys(values).includes(placeholder.replace(/[{}]/g, "").trim())
  );

  if (placeholdersInValues.length === 0) {
    return template.replace(regex, "");
  }

  Object.entries(values).forEach(([key, value]) => {
    const decodeMethod = value.split(":")[0];
    value = value.split(":")[1];

    switch (decodeMethod) {
      case "b64":
        value = Buffer.from(value, "base64").toString("utf-8");
        break;
      case "c13":
        value = rot13Decode(value);
        break;
      case "uri":
        value = decodeURIComponent(value);
        break;
      default:
        value = "";
    }

    template = template.replace(`{{ ${key} }}`, value);
  });

  return template;
}

const rot13Decode = (value: string) => {
  const alpha =
    "abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM";
  return value.replace(
    /[a-z]/gi,
    (letter) => alpha[alpha.indexOf(letter) + 13]
  );
};
