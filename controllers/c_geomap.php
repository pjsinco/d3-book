<?php 
/**
 * Bar Graph controller
 */
class geomap_controller extends base_controller {
  
  /**
   * 
   */
  public function __construct() {
    parent::__construct();
  }


  public function example( $example = 0 ) {

    $this->template->content =
      View::instance('v_geomap_example_' . $example);
  
    $client_files_head = Array(
      //'http://d3js.org/d3.v3.min.js',
      '/libs/d3.min.js',
      '/libs/modernizr.custom.97318.js',
      '/libs/index.js', // d3.tooltip
      '/libs/topojson.js', // d3.tooltip
      '/css/geomap_example_' . $example . '.css'
    );
    $this->template->client_files_head =
      Utils::load_client_files($client_files_head);

    $client_files_body = Array(
      '/libs/jquery-1.9.1.js',
      '/js/geomap_example_' . $example . '.js'
    );
    $this->template->client_files_body =
      Utils::load_client_files($client_files_body);

    // render view
    echo $this->template;;

  }
} // eoc

?>
