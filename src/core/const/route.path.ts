const route = {
  MyPage: '/my-page',
  PrivacyUpdate: '/my-page/privacy-update',
  Key: '/key',
  List: '/list',
  Create: '/create',
  Landing: '/',
  NotFound: '/notFound',
  HowToUse: '/how-to-use',
  privacyPolicy: '/privacy-policy',
  MakeKey: '/key/make-key',
};

export const notUserAllowRoute = [route.List, route.Landing, route.HowToUse];

export default route;
