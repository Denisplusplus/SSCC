#Search for strong-connected components

##Kosaraju's algorithm:
1. Perform a DFS of G and number the vertices in order of completion of the recursive calls.
2. Construct a new directed graph Gr by reversing the direction of every arc in G.
3. Perform a DFS on Gr starting the search from the highest numbered vertex according to the numbering assigned at step 1. If the DFS does not reach all vertices, start the next DFS from the highest numbered remaining vertex.
4. Each tree in the resulting spanning forest is a strong component of G.

##Structure of writing code for console version:
 * Reading the graph: we use adjacency matrix for assignment graph  
 * Loop in the deph for original graph with topologigal sorted output list
 * Reverse original graph
 * Loop in the deph for reversion graph in toplological sorted order
 * Output components from step (1.4)- strong-connected components  

##Structure of writing code for version with graphic interface:
 1. Interface part (JavaScript | OpenLayers3 | HTML | CSS):
    * Making the html page with certain design and sizes
    * Using OpenLayers3 as a library for creating graphs 
    * Create empty sheet instead for the original map for recieving an ability to input the graph  
    * The complexity of creating graphical dynamic objects is assumed by OpenLayers3- JS library 
    * Creating the arrow and chosing the suitable design are our purposes 
    * Final unit of the interface part is making the adjacent matrix for transfering to the sever
 2. Sever part (Python): 
    *
    *
    *
    *
    
##Links for better understanding algorithm and code:
  * https://en.wikipedia.org/wiki/Kosaraju's_algorithm
  * http://lcm.csa.iisc.ernet.in/dsa/node171.html
  * https://www.youtube.com/watch?v=RpgcYiky7uw&t=1176s
  * https://www.python.org
  * https://openlayers.org/en/latest/doc/tutorials/
