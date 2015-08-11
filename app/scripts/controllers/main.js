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
            controller.currentVideo = 0;

            controller.onPlayerReady = function(API) {
                controller.API = API;
            };

            controller.onCompleteVideo = function() {
                controller.isCompleted = true;
                controller.currentVideo++;
                if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;
                controller.setVideo(controller.currentVideo);
            };

            controller.videos = [
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
                sources: controller.videos[0].sources,
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
                plugins: {
                    poster: "http://www.videogular.com/assets/images/videogular.png"
                }
            };

            controller.setVideo = function(index) {
                controller.API.stop();
                controller.currentVideo = index;
                controller.config.sources = controller.videos[index].sources;
                $timeout(controller.API.play.bind(controller.API), 100);
            };
        }]

  );
