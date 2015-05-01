var myApp = angular.module("reddit", ['ui.router', 'templates'])

// FACTORIES
myApp.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}])

// CONTROLLER
myApp.controller('MainCtrl',[
	'$scope',
	'posts',
	 function($scope, posts) {

			$scope.addPost = function(){
				if(!$scope.title || $scope.title === '') { return; }
				$scope.posts.push({
					title: $scope.title,
					upvotes: 0,
					link: $scope.link,
					comments: [
						{author: 'paul', body: 'super sweet post', upvotes: 0},
						{author: 'erol', body: 'yayyyy', upvotes: 0}
					]
				});
				$scope.title = "";
				$scope.link = "";
			}

			$scope.posts = posts.posts

			$scope.incrementUpvote = function(post){
				post.upvotes += 1;
			};

	}
]);

myApp.controller("PostsCtrl",[
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){

		$scope.post = posts.posts[$stateParams.id]

		$scope.addComment = function(){
			if($scope.body == '') { return; }
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = ''
		};
	}
]);


// CONFIGURATION
myApp.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'assets/home/_home.html',
				controller: 'MainCtrl'
			})
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: 'assets/posts/_posts.html',
				controller: 'PostsCtrl'
			});

		$urlRouterProvider.otherwise('home');

}]);

