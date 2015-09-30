angular.module('app', [])
	.filter('range', function() {
		return function(input, total) {
			total = parseInt(total);
			for (var i=0; i<total; i++)
				input.push(i);
			return input;
		};
	})
	.value('frontendSkills', [
		{
			name: 'HTML',
			level: 6
		},
		{
			name: 'CSS',
			level: 6
		},
		{
			name: 'Javascript',
			level: 6
		},
		{
			name: 'jQuery',
			level: 5
		},

		{
			name: 'Less',
			level: 5
		},
		{
			name: 'Bootstrap',
			level: 6
		}
	])
	.value('backendSkills', [
		{
			name: 'PHP',
			level: 4
		},
		{
			name: 'MySQL',
			level: 4
		},
		{
			name: 'Laravel',
			level: 5
		},
		{
			name: 'Drupal',
			level: 4
		},
		{
			name: 'Ruby on Rails',
			level: 4
		},
		{
			name: 'Vagrant',
			level: 5
		}
	])
	.value('knowledge', [
		'Teamwork',
		'Collaboration',
		'Communication',
		'Web Standards',
		'Crossing browser',
		'UI / UX design',
		'MVC Framework',
		'Stored Procedure',
		'Agile Development',
		'JIRA',
		'SVN / Git',
		'Unit Testing',
		'Data structures / Algorithms',
		'AutoCAD',
		'Thermodynamics',
		'Fluid Mechanic',
		'Mechanics of Materials',
		'Advanced Calculus',
		'Dynamics'
	])
	.controller('MainCtrl', ['$scope','frontendSkills','backendSkills','knowledge',
		function($scope, frontendSkills, backendSkills, knowledge) {
		$scope.frontendSkills = frontendSkills;
		$scope.backendSkills = backendSkills;
		$scope.knowledge = knowledge;

		var jsFrameworks = [
			{
				name: 'AngularJS',
				level: 6
			},
			{
				name: 'Backbone.JS',
				level: 5
			},
			{
				name: 'ionic',
				level: 5
			}
		];

		$scope.jsFramworks = jsFrameworks;

		//angular.element('.events-heading').on('click', function() {
		//	$(this).siblings(' .description').slideToggle(function() {
		//		backendSkills[0].active = $(this).is(":visible") ;
		//		$scope.$apply();
		//	});
		//});
	}]);
