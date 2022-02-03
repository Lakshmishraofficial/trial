import $, {
    ajax
} from 'jquery';

const ajaxFilter = () => {
    $('.js-filter-item').on('click', function(e) {
        e.preventDefault();
        const category = $(this).data('category');
        $('.js-filter-item').removeClass('active');
        $(this).addClass('active');
        ajax({
            // eslint-disable-next-line no-undef
            url: wpAjax.ajaxUrl,
            data: {
                action: 'filter',
                category
            },
            type: 'POST',
            success: (result) => {
                $('.js-filter').html(result);
            },
            error: (result) => {
                console.warn('result', result);
            }
        });
    });
};

export default ajaxFilter;