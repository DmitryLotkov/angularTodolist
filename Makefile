start:
		docker container start todolist-container
stop:
		docker container stop todolist-container
run:
		docker run -d -p 3000:3000 --name todolist-container dmitrylotkov/angular-todolist
push:
		docker push dmitrylotkov/angular-todolist:latest
tag:
		docker tag dmitrylotkov/angular-todolist todolist
delete:
			docker rmi todolist-container
build:
			docker build -t dmitrylotkov/angular-todolist .
