// 'use strict';

// angular.module('proj4App')
//   .directive('wordCloud', ['d3Service',function (d3Service, DashboardCtrl) {
//     console.log("wordCloud");
//     console.log(that.words)
//     return {
//       restrict: 'E',
//         scope:{
//             // attributes
//             width : "@",
//             height: "@",
//             fontFamily : "@",
//             fontSize: "@",

//             // Bindings
//             words: "=",

//             // EventCallbacks
//             onClick: "&",
//             onHover: "&"
//         },
//       link: function postLink(scope, element, attrs) {
//           // Default Values
//           var width             =   800;
//           var height            =   600;
//           var fontFamily        =   "Impact";
//           var fontSize          =   100;
//           var words;

//           // Check and set attributes, else keep then default values
//           if(angular.isDefined(attrs.width))        width           = attrs.width;
//           if(angular.isDefined(attrs.height))       height          = attrs.height;
//           if(angular.isDefined(attrs.fontFamily))   fontFamily      = attrs.fontFamily;
//           if(angular.isDefined(attrs.fontSize))     fontSize        = attrs.fontSize * 1 || 0; // !parseInt, detect wrong input

//           // Check Scope
//           if(angular.isDefined(scope.words))    words   = scope.words;


//           //TODO: Refactor String to a service
//           // Skip rendering when no corrent word param is parsed
//           if(angular.isDefined(scope.words) && angular.isArray(words)){
//               words   = scope.words
//           }
//           else if(angular.element(element).find("word").length>0){
//               var subelements = angular.element(element).find("word");
//               words = [];
//               angular.forEach(subelements,function(word){
//                   words.push(angular.element(word).text());
//                   angular.element(word).remove();
//               });
//           }
//           else if(element.text().length > 0){
//               words = element.text().split(",");
//               element.text("");

//           }
//           else{
//               element.text("wordcloud: Please define some words");
//               return;
//           }
//           // Font-Size Param wrong
//           if(!angular.isNumber(fontSize) || fontSize<=0){
//               element.text("wordcloud: font-size attribute not valid. font-size "+attrs.fontSize +" -> "+fontSize);
//               return;
//           }

//           // CloudFactory - so high in the sky ;)
//           // Keep the anonym functions here for readability
//           var cloudFactory = function(words){


//               // TODO: Add fill Function Binding for own function
//               var fill = d3.scale.category20();

//               d3.layout.cloud().size([width, height])
//                   .words(words.map(function(d) {
//                       return {text: d, size: Math.random() * fontSize};
//                   }))
//                   .rotate(function() { return ~~(Math.random() * 2) * -90; })
//                   .font(fontFamily)
//                   .fontSize(function(d) { return d.size; })
//                   .on("end", draw)
//                   .start();

//               function draw(words) {
//                   // Center the drawing
//                   var height_translate = height/2;
//                   var width_translate = width/2;
//                   var rootElement = element[0];


//                   d3.select('wordCloud')
//                       .append("svg")
//                       .attr("width", width)
//                       .attr("height", height)
//                       .append("g")
//                       .attr("transform", "translate("+width_translate+","+height_translate+")")// Translate to center
//                       .selectAll("text")
//                       .data(words)
//                       .enter().append("text")
//                       .style("font-size", function(d) { return d.size + "px"; })
//                       .style("font-family", fontFamily)
//                       .style("fill", function(d, i) { return fill(i); })
//                       .attr("text-anchor", "middle")
//                       .attr("transform", function(d) {
//                           return "translate(" + [d.x, d.y] + ") rotate(" + d.rotate + ")";
//                       })
//                       .text(function(d) { return d.text; })
//                       .on("click",function(d){
//                           scope.onClick({element: d});
//                       })
//                       .on("mouseover",function(d){
//                           scope.onHover({element: d});
//                       });
//               }
//           };

//           // Execute
//           cloudFactory(words);
//       }
//     };
//   }]);

// // var twitterWordList = [];
// // var frequency_list = [{"text":"study","size":40},{"text":"motion","size":15},{"text":"forces","size":10},{"text":"electricity","size":15},{"text":"movement","size":10},{"text":"relation","size":5},{"text":"things","size":10},{"text":"force","size":5},{"text":"ad","size":5},{"text":"energy","size":85},{"text":"living","size":5},{"text":"nonliving","size":5},{"text":"laws","size":15},{"text":"speed","size":45},{"text":"velocity","size":30},{"text":"define","size":5},{"text":"constraints","size":5},{"text":"universe","size":10},{"text":"physics","size":120},{"text":"describing","size":5},{"text":"matter","size":90},{"text":"physics-the","size":5},{"text":"world","size":10},{"text":"works","size":10},{"text":"science","size":70},{"text":"interactions","size":30},{"text":"studies","size":5},{"text":"properties","size":45},{"text":"nature","size":40},{"text":"branch","size":30},{"text":"concerned","size":25},{"text":"source","size":40},{"text":"google","size":10},{"text":"defintions","size":5},{"text":"two","size":15},{"text":"grouped","size":15},{"text":"traditional","size":15},{"text":"fields","size":15},{"text":"acoustics","size":15},{"text":"optics","size":15},{"text":"mechanics","size":20},{"text":"thermodynamics","size":15},{"text":"electromagnetism","size":15},{"text":"modern","size":15},{"text":"extensions","size":15},{"text":"thefreedictionary","size":15},{"text":"interaction","size":15},{"text":"org","size":25},{"text":"answers","size":5},{"text":"natural","size":15},{"text":"objects","size":5},{"text":"treats","size":10},{"text":"acting","size":5},{"text":"department","size":5},{"text":"gravitation","size":5},{"text":"heat","size":10},{"text":"light","size":10},{"text":"magnetism","size":10},{"text":"modify","size":5},{"text":"general","size":10},{"text":"bodies","size":5},{"text":"philosophy","size":5},{"text":"brainyquote","size":5},{"text":"words","size":5},{"text":"ph","size":5},{"text":"html","size":5},{"text":"lrl","size":5},{"text":"zgzmeylfwuy","size":5},{"text":"subject","size":5},{"text":"distinguished","size":5},{"text":"chemistry","size":5},{"text":"biology","size":5},{"text":"includes","size":5},{"text":"radiation","size":5},{"text":"sound","size":5},{"text":"structure","size":5},{"text":"atoms","size":5},{"text":"including","size":10},{"text":"atomic","size":10},{"text":"nuclear","size":10},{"text":"cryogenics","size":10},{"text":"solid-state","size":10},{"text":"particle","size":10},{"text":"plasma","size":10},{"text":"deals","size":5},{"text":"merriam-webster","size":5},{"text":"dictionary","size":10},{"text":"analysis","size":5},{"text":"conducted","size":5},{"text":"order","size":5},{"text":"understand","size":5},{"text":"behaves","size":5},{"text":"en","size":5},{"text":"wikipedia","size":5},{"text":"wiki","size":5},{"text":"physics-","size":5},{"text":"physical","size":5},{"text":"behaviour","size":5},{"text":"collinsdictionary","size":5},{"text":"english","size":5},{"text":"time","size":35},{"text":"distance","size":35},{"text":"wheels","size":5},{"text":"revelations","size":5},{"text":"minute","size":5},{"text":"acceleration","size":20},{"text":"torque","size":5},{"text":"wheel","size":5},{"text":"rotations","size":5},{"text":"resistance","size":5},{"text":"momentum","size":5},{"text":"measure","size":10},{"text":"direction","size":10},{"text":"car","size":5},{"text":"add","size":5},{"text":"traveled","size":5},{"text":"weight","size":5},{"text":"electrical","size":5},{"text":"power","size":5}];


// //     var color = d3.scale.linear()
// //             .domain([0,1,2,3,4,5,6,10,15,20,100])
// //             .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
// //             //.range(["#222", "#333", "#444", "#555", "#666", "#777", "#888", "#999", "#aaa", "#bbb", "#ccc", "#ddd"])

// //     d3.layout.cloud().size([400, 400])
// //             .words(frequency_list)
// //             .rotate(0)
// //             .fontSize(function(d) { return d.size; })
// //             .on("end", draw)
// //             .start();

// //     function draw(words) {
// //         var canvas = d3.select("body");

// //                   canvas
// //                     .selectAll(".one")
// //                     .append("svg")
// //                     .attr("width", 850)
// //                     .attr("height", 350)
// //                     .attr("class", "wordcloud")
// //                     .append("g")

// //         var wordSalad = canvas.selectAll(".one")
// //               wordSalad
// //                 .select('svg')
// //                 // without the transform, words words would get cutoff to the left and top, they would
// //                 // appear outside of the SVG area
// //                 .attr("transform", "translate(320,200)")
// //                 .selectAll("text")
// //                 .data(words)
// //                 .enter().append("text")
// //                 .attr("x", 150)
// //                 .attr("y", 190)
// //                 .style("font-size", function(d) { return d.size + "px"; })
// //                 .style("fill", function(d, i) { return color(i); })
// //                 .attr("transform", function(d) {
// //                     return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
// //                 })
// //                 .text(function(d) { return d.text; });
