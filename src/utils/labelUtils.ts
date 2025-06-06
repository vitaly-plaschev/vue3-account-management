import { Label } from "@/types/Label";

export function wrapLabel(label: string): string {
  if (!label) return '[]';
  return JSON.stringify(
    label.split(";").map((item) => {
      return { text: item };
    })
  );
}

export function unwrapLabel(label: string): string {
  if (!label) return '[]';
  const labels = JSON.parse(label);
  return labels.map((item: Label) => item.text).join(';');
}
