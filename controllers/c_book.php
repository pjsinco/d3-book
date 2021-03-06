<?php 
class book_controller extends base_controller {
	
  public function __construct() {
  	parent::__construct();
  } 
  	
  public function chapter($chapter, $example = 0) {	
    $this->template->content =
      //View::instance('v_example_index');
      View::instance('v_book_chapter_' . $chapter
        . '_' . $example);
  
    $client_files_head = Array(
      //'http://d3js.org/d3.v3.min.js',
      '/libs/d3.min.js',
      '/libs/modernizr.custom.97318.js',
      '/css/main.css'
    );
    $this->template->client_files_head =
      Utils::load_client_files($client_files_head);

    $client_files_body = Array(
      '/libs/jquery-1.9.1.js',
      '/js/book_chapter_' . $chapter . '_' . $example . '.js'
    );
    $this->template->client_files_body =
      Utils::load_client_files($client_files_body);

    // render view
    echo $this->template;;

  }
		
} // eoc
?>
