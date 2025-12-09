import type { FieldHook } from 'payload';

/**
 * Extracts plain text from Lexical editor JSON content
 */
function extractTextFromLexical(node: unknown): string {
  if (!node || typeof node !== 'object') return '';

  const n = node as Record<string, unknown>;

  // Handle text nodes
  if (n.type === 'text' && typeof n.text === 'string') {
    return n.text;
  }

  // Handle nodes with children (paragraphs, headings, lists, etc.)
  if (Array.isArray(n.children)) {
    return n.children.map((child) => extractTextFromLexical(child)).join(' ');
  }

  // Handle root node
  if (n.root && typeof n.root === 'object') {
    return extractTextFromLexical(n.root);
  }

  return '';
}

/**
 * Calculates reading time based on word count
 * Average reading speed: 200-250 words per minute
 * Using 200 WPM for a comfortable reading pace
 */
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Hook to automatically calculate and populate reading time
 * based on the post's content field
 */
export const populateReadingTime: FieldHook = ({ data }) => {
  if (!data?.content) return 1;

  const text = extractTextFromLexical(data.content);
  return calculateReadingTime(text);
};
