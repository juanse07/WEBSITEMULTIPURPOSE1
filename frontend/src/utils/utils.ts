import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';

export function generateSlug(input: string){
    return input
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .trim()
    .replace(/ +/g, " ")
    .replace(/\s/g, '-')
    

}

export function formatDate(dateString: string){
    return format(new Date(dateString), 'MMM d, yyyy');
}

export function formatRelativeDate(dateString: string){
    return formatDistanceToNowStrict(new Date(dateString),{addSuffix: true});
}