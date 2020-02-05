'use strict';

angular.module('projetoBase')
  .service('$api', function ($http, $q, URL_API) {

    this.base = function (value) {
      return new Resource(value);
    }

    function Resource(base) {

      var http = function (method, path, data, paginacao) {
        var deferred = $q.defer();

        if (method === 'POST' || method === 'PUT') {
          $http({method: method, data: data, url: URL_API.urlBase + '/' + base + '/' + path})
            .success(function (data) {
              deferred.resolve(data);
            }).error(function (err) {
              deferred.reject(err);
            });
          return deferred.promise;
        } else {
          $http({method: method, url: URL_API.urlBase + '/' + base + '/' + path, params: paginacao})
            .success(function (data) {
              deferred.resolve(data);
            }).error(function (err) {
              deferred.reject(err);
            });
          return deferred.promise;
        }

      }

      this.head = function (path) {
        return http('HEAD', path === undefined ? '' : path);
      };

      this.get = function (path, paginacao) {
        return http('GET', path === undefined ? '' : path, null, paginacao);
      };
      this.post = function (path, data) {
        return http('POST', path === undefined ? '' : path, data || '');
      };
      this.delete = function (path) {
        return http('DELETE', path === undefined ? '' : path );
      };
      this.put = function (path, data) {
        return http('PUT', path === undefined ? '' : path, data || '');
      }
    }

  });
