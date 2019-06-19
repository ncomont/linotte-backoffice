declare var ENVIRONMENT: string;

export class AppSettings {
    public static get API_ENDPOINT() {
        if (ENVIRONMENT === 'production') {
            return 'http://api.linotte.hvcn.nicolasc.eu';
        } else {
            return 'http://localhost:10000';
        }
    }

    public static SECURE_API_ENDPOINT = `${AppSettings.API_ENDPOINT}/secure`;

    public static LOGIN_ENDPOINT = `${AppSettings.API_ENDPOINT}/login`;

    public static TAXREF_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/taxref`;
    public static TAXON_ENDPOINT = `${AppSettings.TAXREF_ENDPOINT}/taxon`;
    public static TAXON_SEARCH_ENDPOINT = `${AppSettings.TAXON_ENDPOINT}/search`;
    public static TAXON_REFERENCE_AND_SYNONYMS_ENDPOINT = `${AppSettings.TAXON_ENDPOINT}/all`;
    public static TAXON_TAXONOMIC_CLASSIFICATION_ENDPOINT = `${AppSettings.TAXON_ENDPOINT}/classification`;

    public static RANK_ENDPOINT = `${AppSettings.TAXREF_ENDPOINT}/rank`;

    public static JOB_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job`;

    public static JOB_REPORTS_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job-reports`;
    public static JOB_REPORT_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job-report`;
    public static JOB_RESULTS_ENDPOINT = `${AppSettings.SECURE_API_ENDPOINT}/job-results`;

    public static DEFAULT_TAXONOMIC_CLASSIFICATION_DEPTH = 3;
    public static PAGE_SIZE = 20;
    public static CONFLICT_RESOLUTION_PAGE_SIZE = 10;
    public static SEARCH_TIMER_VALUE = 500;

    public static SEARCH_EVENT = 'search-taxon';
    public static PAGE_EVENT = 'change-page';
    public static SELECT_TAXON_EVENT = 'select-taxon';
    public static RESOLVE_TAXON_EVENT = 'resolve-taxon';
    public static SHOW_TAXON_RESOLVER_EVENT = 'show-taxon-resolver';
    public static STATE_FILTER_CHANGE_EVENT = 'state-filter-change';
    public static REFRESH_RESULTS_EVENT = 'refresh-results';

    public static LS_TOKEN_KEY = 'token';
}
