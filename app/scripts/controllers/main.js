'use strict';

/**
 * @ngdoc function
 * @name rockNdocularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rockNdocularApp
 */

angular.module('rockNdocularApp')
  .controller('MainCtrl',
        ["$sce", function ($sce) {
            this.config = {
                sources: [
          ],
                theme: {
          url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                }
            };
        }]

["$sce", "$timeout", function ($sce, $timeout) {
            var controller = this;
            controller.state = null;
            controller.API = null;
            controller.currentAudio = 0;

            controller.onPlayerReady = function(API) {
                controller.API = API;
            };

            controller.onCompleteAudio = function() {
                controller.isCompleted = true;
                controller.currentAudio++;
                if (controller.currentAudio >= controller.audios.length) controller.currentAudio = 0;
                controller.setAudio(controller.currentAudio);
            };

            controller.audios = [
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("/audio/RockinDoc-1-24-95.mp3"), type: "audio/mp3"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("/audio/RockinDoc-1-31-95.mp3"), type: "audio/mp3"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("/audio/RockinDoc-2-21-95.mp3"), type: "audio/mp3"}
                ]
            }
        ];

            controller.config = {
                preload: "none",
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: controller.audios[0].sources,
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
                plugins: {
                    poster: "http://www.videogular.com/assets/images/videogular.png"
                }
            };

            controller.setAudio = function(index) {
                controller.API.stop();
                controller.currentAudio = index;
                controller.config.sources = controller.audios[index].sources;
                $timeout(controller.API.play.bind(controller.API), 100);
            };
        }]

  );
