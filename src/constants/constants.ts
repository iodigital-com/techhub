export const ALLOWED_THEMES = ['green', 'beige', 'blue', 'pink'] as const;

export const ALLOWED_TAGS = ['Frontend', 'Backend', 'ReactJS', 'VueJS', 'AngularJS'] as const;
export type Tags = typeof ALLOWED_TAGS[number]
