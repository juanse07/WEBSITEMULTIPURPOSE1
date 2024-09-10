import format from 'date-fns/format';

export function generateSlug(input: string){
    return input
    .replace(/[^a-zA-Z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

}

export function formatDate(dateString: string){
    return format(new Date(dateString), 'MM d, yyyy');
}