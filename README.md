# Base Banner Template

This is the base template banner, to start a project please follow these steps:

 - Clone the repo
 - Add the banners dimensions
    - Open dimensions.json
    - Update the file with relevant dimensions. Example below for 160x600 and 60X600


    {
      "dimensions": [
        "120x600",
        "160x600"
      ]
    }  


 - Add your images in the relevant img (src/fixtures/banners/{widthxheight})


## Get Started

Run the following commands to get started. You will need to have node.js installed on your system - https://nodejs.org/en/

    npm install

Generate the code for template

    grunt createBanners  

Add images
    Add your images in the relevant img folder (src/fixtures/banners/{widthxheight}/img/)
    run the command below to compress your images

    grunt tinypng  

Generate the production code

    grunt

#### Once grunt is running the banners should be viewable at this location http://localhost:9000/


## Building the banner

All your changes should be done in the src/fixtures/banners/ folder


## Production Code

The code for production is in the 'prod/banners' folder


## Code consistency

Ids created for animation must follow the same structure in the sample html. e.g frame1, frame2.... This will help have a better understanding of the frame order and consistency will make the js and markup clearer.


## Directory Structure

src/global/scss/ - Location where all the base scss and helper classes - PLEASE DO NOT MODIFY

src/fixtures/banners/_global.scss - Changes which affect all banners go in this file. eg. all banners have a red background

src/fixtures/banners/{demensions}/css/_overwrites.scss - Changes which affect a specific banner go this file. eg. only one banner has a red background


# Advanced Settings

If you want your banner directories to use a different structure, you can achieve this by modifying the gruntfile.js and src/template/css/style.css

e.g you want the following structure

    \urban-living
        \160x100
        \300x1250



### gruntfile.js

In line 6, edit the "category" variable, making sure you include a '/' in the end, e.g

    category = 'urban-living/'


### src/template/css/style.scss

update the imports path, to avoid break the link. e.g

    change
    @import "../../../../globals/scss/vars";
    @import "../../global";
    @import "overwrites";
    @import "../../../../globals/scss/normalize";
    @import "../../../../globals/scss/base";

    to
    @import "../../../../../globals/scss/vars";
  	@import "../../../global";
  	@import "overwrites";
  	@import "../../../../../globals/scss/normalize";
  	@import "../../../../../globals/scss/base";

###needs to reflect your changes
