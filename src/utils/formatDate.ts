import siteMetadata from '@data/siteMetadata';

export const formatDate = (date: any, formatOptions?: Intl.DateTimeFormatOptions) =>
  new Date(date).toLocaleString(siteMetadata.locale, formatOptions);
