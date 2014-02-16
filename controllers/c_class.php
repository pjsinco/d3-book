<?php 
class class_controller extends base_controller {
	
  public function __construct() {
  	parent::__construct();
  } 
  	
  public function lab($lab_number, $example) {	
    $this->template->content =
      //View::instance('v_example_index');
      View::instance('v_lab_' . $lab_number
        . '_' . $example);

  
    $client_files_head = Array(
      //'http://d3js.org/d3.v3.min.js',
      '/misc/d3-book-master/d3/d3.v3.js',
      //'/js/modernizr.custom.97318.js',
      '/css/class_lab_' . $lab_number . '.css',
      '/css/main.css'
    );
    $this->template->client_files_head =
      Utils::load_client_files($client_files_head);

    $client_files_body = Array(
      '/js/jquery-1.9.1.js',
      '/js/lab_' . $lab_number . '_' . $example . '.js'
    );
    $this->template->client_files_body =
      Utils::load_client_files($client_files_body);

    // render view
    echo $this->template;;

  }
		
} // eoc
?>
