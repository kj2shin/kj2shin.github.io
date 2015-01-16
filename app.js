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
			name: 'HTML 5',
			level: 6
		},
		{
			name: 'CSS 3',
			level: 5
		},
		{
			name: 'Javascript',
			level: 7
		},
		{
			name: 'jQuery',
			level: 6
		},

		{
			name: 'Less',
			level: 6
		},
		{
			name: 'Bootstrap',
			level: 6
		}
	])
	.value('backendSkills', [
		{
			name: 'PHP',
			level: 7
		},
		{
			name: 'MySQL',
			level: 6
		},
		{
			name: 'Laravel'
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
				name: 'Backbone',
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