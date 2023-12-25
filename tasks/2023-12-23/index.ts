export type JsonSchema = {
  type: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  nullable?: boolean;
};

export const generateSchema = (schemaDefinition: JsonSchema): JsonSchema => {
  const schema: JsonSchema = { ...schemaDefinition };

  if (schema.type === "object" && schema.properties) {
    schema.properties = Object.fromEntries(
      Object.entries(schema.properties).map(([key, value]) => {
        return [key, generateSchema(value)];
      })
    );
  }

  if (schema.type === "array" && schema.items) {
    schema.items = generateSchema(schema.items);
  }

  return schema;
};

export const validate = (schema: JsonSchema, jsonObject: any): boolean => {
  if (schema.type === "object" && schema.properties) {
    const objectKeys = Object.keys(jsonObject);
    const schemaKeys = Object.keys(schema.properties);

    if (schema.required) {
      const missingRequiredKeys = schema.required.filter(
        (key) => !objectKeys.includes(key)
      );

      if (missingRequiredKeys.length > 0) {
        return false;
      }
    }

    if (objectKeys.length > schemaKeys.length) {
      return false;
    }

    return Object.entries(schema.properties).every(([key, value]) => {
      return validate(value, jsonObject[key]);
    });
  }

  if (schema.type === "array" && schema.items) {
    if (!Array.isArray(jsonObject)) {
      return false;
    }

    return jsonObject.every((item) => validate(schema.items!, item));
  }

  if (schema.nullable && jsonObject === null) {
    return true;
  }

  return typeof jsonObject === schema.type;
};
