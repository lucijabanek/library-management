exports.GET_METHOD = "get";
exports.POST_METHOD = "post";
exports.PUT_METHOD = "put";

exports.JWT = "jwt";
exports.ROLE = "role";
exports.BEARER = "Bearer";

exports.LOGIN_PATH = "/user/login";
exports.USER_PROFILE_PATH = "/user/profile";
exports.PASSWORD_CREATE_PATH = "/user/password-create";
exports.MEMBER_CREATE_PATH = "/member-create";
exports.MEMBER_PATH = "/member";

exports.PASSWORD_CREATE_USER_PATH = "/user/password-create?user=";
exports.PASSWORD_CREATE_TOKEN_QUERY = "&token=";
exports.PASSWORD_CREATE_EMAIL_QUERY = "&email=";
exports.PASSWORD_RESET_PATH = "/user/password-reset";

exports.LENDINGS_PATH = "/lendings";
exports.ALL_LENDINGS_PATH = "/lending?page=";
exports.IS_ACTIVE_QUERY = "&isActive=";
exports.RETURN_BOOK_PATH = "/lending/bookReturn/";
exports.CREATE_LENDING_PATH = "/lending";

exports.FILTER_AUTHOR_BY_NAME_PATH = "/author/filter-by-name?name=";
exports.FILTER_GENRE_BY_NAME_PATH = "/genre/filter-by-name?name=";
exports.FILTER_BOOK_BY_TITLE_PATH = "/book/filter-by-title?title=";
exports.FILTER_BOOKS_PATH = "/book/filter-books?size=5&page=";
exports.FILTER_MEMBER_BY_EMAIL_PATH = "/member?include=User";

exports.FORMAT_YEAR = "YYYY";
exports.ALL_LENDINGS = "all-lendings";
exports.SERVER_ERROR = "Something went wrong...";
