export function getContentWithEllipsis(content: string): string {
  return content.length > 10 ? content.slice(0, 6).concat('...') : content;
}
