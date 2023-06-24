start:
		docker container start todolist-container
stop:
		docker container stop todolist-container
run:
		docker run -d -p 3000:3000 --env-file ./config/.env --name todolist-container dmitrylotkov/angular-todolist
push:
		docker push dmitrylotkov/angular-todolist:latest
tag:
		docker tag dmitrylotkov/angular-todolist todolist
delete-container:
		docker rm todolist-container
delete-img:
		docker rmi dmitrylotkov/angular-todolist
build:
		docker build -t dmitrylotkov/angular-todolist .
run-dev:
		docker run -d -p 3000:3000 -v "D:\It-incubator\angularTodolist:/usr/src/app/data" -v /usr/src/app/data/node_modules --env-file ./config/.env  --name todolist-container dmitrylotkov/angular-todolist
