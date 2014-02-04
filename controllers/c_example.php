<?php 
class example_controller extends base_controller {
	
  public function __construct() {
  	parent::__construct();
  } 
  	
  public function index() {	
    $this->template->content =
      //View::instance('v_example_index');
      View::instance('v_example_index2');
  
    $client_files_head = Array(
      'http://d3js.org/d3.v3.min.js',
      '/js/modernizr.custom.97318.js',
      '/css/main.css'
    );
    $this->template->client_files_head =
      Utils::load_client_files($client_files_head);

    $client_files_body = Array(
      '/js/jquery-1.9.1.js',
      '/js/example_index.js'
    );
    $this->template->client_files_body =
      Utils::load_client_files($client_files_body);

    // render view
    echo $this->template;;

  }
		



} // eoc
?>
