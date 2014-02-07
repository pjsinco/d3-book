<?php 
class examples_controller extends base_controller {
	
  public function __construct() {
  	parent::__construct();
  } 
  	
  public function chapter($chapter, $example = 0) {	
    $this->template->content =
      //View::instance('v_example_index');
      View::instance('v_examples_chapter_' . $chapter
        . '_' . $example);
  
    $client_files_head = Array(
      'http://d3js.org/d3.v3.min.js',
      '/js/modernizr.custom.97318.js',
      '/css/main.css'
    );
    $this->template->client_files_head =
      Utils::load_client_files($client_files_head);

    $client_files_body = Array(
      '/js/jquery-1.9.1.js',
      '/js/examples_chapter_' . $chapter . '_' . $example . '.js'
    );
    $this->template->client_files_body =
      Utils::load_client_files($client_files_body);

    // render view
    echo $this->template;;

  }
		
} // eoc
?>
