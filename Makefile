PASS=$(shell echo $$LAURADOCKERPASSWORD)

clean: 
	docker rmi laurafitz/frontendtest; docker rmi laurafitz/frontend

build-test:
	docker build -f Dockerfile-test -t laurafitz/frontendtest .

test: build-test
	docker run --rm -v $(shell pwd)/src:/frontend laurafitz/frontendtest

build:
	docker build -t laurafitz/frontend .

release: build
	docker push laurafitz/frontend
	make update

update:
	kubectl --kubeconfig=/home/laura/fyp/my-cluster/kubeconfig delete rc frontend
	kubectl --kubeconfig=/home/laura/fyp/my-cluster/kubeconfig create -f frontend-rc.yaml
	kubectl --kubeconfig=/home/laura/fyp/my-cluster/kubeconfig get pods -w
	