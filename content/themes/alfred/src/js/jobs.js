/* eslint-disable */
const $ = jQuery.noConflict();
const PER_PAGE = 10;
const ARRAY_ELEMENTS = ['js_role', 'js_department', 'js_city'];
const ARRAY_DEPARTMENTS = [];
const ARRAY_CITY = [];
let results = PER_PAGE;

const jobsList = new List('js-jobs', {
    valueNames: ARRAY_ELEMENTS,
    page: PER_PAGE,
    plugins: [
        ListPagination({
            paginationClass: 'js-pagination',
            left: 500,
            right: 500,
        }),
    ],
});

jobsList.sort('js_department', {
    order: 'desc'
});

const updateList = () => {
    let jobsDepartments = ($('#alfred-departments').val() || '').replace(/&/ig, '&amp;');
    let jobsCity = ($('#alfred-city').val() || '').replace(/&/ig, '&amp;');

    if (jobsDepartments === 'department') {
        jobsDepartments = '';
    }

    if (jobsCity === 'city') {
        jobsCity = '';
    }

    jobsList.filter(item => (jobsDepartments === item.values().js_department || !jobsDepartments) &&
        (jobsCity === item.values().js_city || !jobsCity));
};

_(jobsList.matchingItems).uniq().each((item) => {
    ARRAY_DEPARTMENTS.push(item.values().js_department);
});

_(ARRAY_DEPARTMENTS).sort().uniq().each((item) => {
    $('#alfred-departments').append(`<option value="${item}">${item}</option>`);
});

_(jobsList.matchingItems).uniq().each((item) => {
    ARRAY_CITY.push(item.values().js_city);
});

_(ARRAY_CITY).sort().uniq().each((item) => {
    $('#alfred-city').append(`<option value="${item}">${item}</option>`);
});

const jobsResults = (page) => {
    const n = n => parseInt(n)
    results = page !== 1 ?
        ((page - 1) * n(jobsList.page)) + n(jobsList.visibleItems.length) :
        jobsList.visibleItems.length;
    $('.js-jobs-results')
        .html(`<p>${results}/${jobsList.matchingItems.length} results.</p>`);
};

const noJobs = () => {
    const element = $('.js-no-jobs');
    if (jobsList.visibleItems.length <= 0) {
        element.show();
    } else {
        element.hide();
    }
};

jobsList.on('updated', (list) => {
    const LIST_LENGTH = list.matchingItems.length;
    const element = $('.js-pagination-wrap');

    if (LIST_LENGTH <= PER_PAGE) {
        element.hide();
    } else {
        element.show();
    }
    jobsResults(1);
    noJobs();
});

$(document).ready(() => {
    $('#alfred-departments, #alfred-city').change(updateList);
    jobsResults(1);
    $('.js-pagination').click(e =>
        jobsResults(parseInt($(e.currentTarget).find('.active a').text())));
    noJobs();
});