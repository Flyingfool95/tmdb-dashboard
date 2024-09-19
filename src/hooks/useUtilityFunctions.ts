

export default function useUtilityFunctions() {

    const slugifyText = (text: string) => {
        return text
            .toString() // Ensure the input is a string
            .normalize('NFD') // Normalize the text to decompose accents
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks (accents, etc.)
            .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove all special characters except spaces and hyphens
            .trim() // Remove leading and trailing spaces
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
            .toLowerCase(); // Convert to lowercase
    };

    return {
        slugifyText
    }
}