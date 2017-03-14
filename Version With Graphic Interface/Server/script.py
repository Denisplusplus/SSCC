#!/usr/bin/env python3

#print("Content-type: text/html")
#print()
#print("<h1>Hello world!</h1>")

import cgi
import json
import cgitb; cgitb.enable() # Optional; for debugging only

print("Content-type: application/json")
print("")

form = cgi.FieldStorage()
test = form.getvalue("test")
res = json.loads(test)


matrix_lin=res["data"]

dim=int(len(matrix_lin) ** 0.5)
graph=[[0 for x in range(dim)] for y in range(dim)] 

k=0
for i in range(dim):
    for j in range(dim):
        graph[i][j]=matrix_lin[k]
        k+=1




def first_dfs(vertex, graph):
    used.add(vertex)
    for v in range(len(graph)):   
        if graph[vertex][v] == 1 and v not in used:   
            first_dfs(v, graph)
    list_vector.append(vertex)

    
def second_dfs(vertex, graph_t):
    used.add(vertex)
    for v in list_vector:   
        if graph_t[vertex][v] == 1 and v not in used:   
            second_dfs(v, graph_t)
    list_components.append(vertex)

    		                 
def reverse_graph(graph):
    graph_t = list(zip(*graph))
    return graph_t
				
			
#MAIN


#set of visited vertices
used = set()
#call first depth-first search
list_vector = [] #vertices in topological sorted order
for vertex in range(len(graph)):
   if vertex not in used:
      first_dfs(vertex, graph)              
list_vector.reverse()

#preparation for calling second depth-first search
graph_t = reverse_graph(graph)
used = set()

#call second depth-first search
list_components = [] #strong-connected components
scc_quantity = 0 #quantity of strong-connected components 
final_list=[]
for vertex in list_vector:
    if vertex not in used:
        scc_quantity += 1
        list_components = []
        second_dfs(vertex, graph_t)
        final_list +=[list_components]
#print(scc_quantity)

#print(final_list)		
print (json.dumps(final_list))
