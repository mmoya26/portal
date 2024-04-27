export function generateRandomCompanyName(): string {
    const prefixes = ['Tech', 'Global', 'Innovative', 'Dynamic', 'Creative', 'Future', 'Smart', 'Digital', 'Virtual', 'Cyber'];
    const suffixes = ['Solutions', 'Labs', 'Systems', 'Technologies', 'Services', 'Enterprises', 'Innovations', 'Co', 'Corp', 'Group'];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${randomPrefix} ${randomSuffix}`;
}