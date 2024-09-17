export async function conductInterviews(
  subjects: string[],
  interview: (subject: string) => Promise<string>,
  timeConstraint: number
): Promise<string[]> {
  const results: string[] = [];

  for (const subject of subjects) {
    const start = Date.now();
    const result = await interview(subject).catch((error) => error.message);
    const end = Date.now();
    const duration = end - start;

    if (duration > timeConstraint) {
      results.push("Error: Timeout");
      continue;
    }

    if (result === "Subject is not allowed") {
      results.push("Error: Subject is not allowed");
      continue;
    }

    results.push(result);
  }

  return Promise.resolve(results);
}
