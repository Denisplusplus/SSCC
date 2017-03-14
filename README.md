# Search for strong-connected components

## Kosaraju's algorithm:
1. Perform a DFS of G and number the vertices in order of completion of the recursive calls.
2. Construct a new directed graph Gr by reversing the direction of every arc in G.
3. Perform a DFS on Gr starting the search from the highest numbered vertex according to the numbering assigned at step 1. If the DFS does not reach all vertices, start the next DFS from the highest numbered remaining vertex.
4. Each tree in the resulting spanning forest is a strong component of G.

## Structure of writing code for console version:
 * Reading the graph: we use adjacency matrix for assignment graph  
 * Loop in the deph for original graph with topologigal sorted output list
 * Reverse original graph
 * Loop in the deph for reversion graph in toplological sorted order
 * Output components from step (1.4)- strong-connected components  

## Structure of writing code for version with graphic interface:
 1. Interface part (JavaScript | OpenLayers3 | HTML | CSS):
    * Making the html page with certain design and sizes
    * Using OpenLayers3 as a library for creating graphs 
    * Create empty sheet instead for the original map for recieving an ability to input the graph  
    * The complexity of creating graphical dynamic objects is assumed by OpenLayers3- JS library 
    * Creating the arrow and choosing the suitable design are our purposes 
    * Final unit of the interface part is making the adjacent matrix for transfering to the server
  2. Server part (Python | CGI | Windows):
     * ///App--->cgi-bin/script.py-----index.html-----code.js----style.css----start.py//  
     * start.py for starting the web-server on localhost:8000
     * index.html, code.js, style.css -frontend part
     * cgi-bin/script.py/ -server part
     * when user clicks the "Run button", JavaScript part sends AJAX request with adjacent matrix in JSON format to the server and then receives the answer-list of strongly-connected components and alert it 
  
## Testing the app:
 For checking the correct working of our app we will use these pages with undeniable true examples:
 * http://olymp.sch239.net/materials/lakhno_dfs.pdf
 * http://www.geeksforgeeks.org/strongly-connected-components/
 * http://atomlex.narod.ru/discret/examples.htm
 
As practice shows, the application is working correctly

## Screenshots
![Image alt](https://github.com/Denisplusplus/SSCC/raw/master/img1.png)
![Image alt](https://github.com/Denisplusplus/SSCC/raw/master/img2.png)
![Image alt](https://github.com/Denisplusplus/SSCC/raw/master/img3.png)
![Image alt](https://github.com/Denisplusplus/SSCC/raw/master/img4.png)
## Links for better understanding algorithm and code:
  * https://en.wikipedia.org/wiki/Kosaraju's_algorithm
  * http://lcm.csa.iisc.ernet.in/dsa/node171.html
  * https://www.youtube.com/watch?v=RpgcYiky7uw&t=1176s
  * https://www.python.org
  * https://docs.python.org/2/library/cgi.html
  * https://openlayers.org/en/latest/doc/tutorials/
  * https://www.w3schools.com/xml/ajax_intro.asp
  * https://en.wikipedia.org/wiki/JSON
