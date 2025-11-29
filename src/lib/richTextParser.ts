export function parseRichText(text: string): string {
  if (!text) return '';
  
  // Split by page breaks first
  const pages = text.split('[PAGE_BREAK]');
  
  return pages.map(page => {
    // Split by line breaks
    const lines = page.split('\n');
    
    return lines.map(line => {
      // Check if line starts with bullet markers
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        const content = line.trim().substring(1).trim();
        return `<li>${formatInlineStyles(content)}</li>`;
      }
      
      // Regular paragraph
      return line.trim() ? `<p>${formatInlineStyles(line.trim())}</p>` : '';
    }).filter(Boolean).join('');
  }).join('<div class="page-break"></div>');
}

function formatInlineStyles(text: string): string {
  // Bold: **text** or __text__
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Italic: *text* or _text_
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.*?)_/g, '<em>$1</em>');
  
  return text;
}

export function hasListItems(text: string): boolean {
  if (!text) return false;
  const lines = text.split('\n');
  return lines.some(line => line.trim().startsWith('•') || line.trim().startsWith('-'));
}
