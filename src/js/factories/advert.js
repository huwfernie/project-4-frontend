angular
  .module('yabee')
  .factory('Advert', Advert);

Advert.$inject = ['$resource', 'API_URL'];
function Advert($resource, API_URL) {
  return new $resource(`${API_URL}/adverts/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
