class ChecklistController {
	constructor($rootScope, $scope, $state, $timeout, ChecklistService) {
		this.rootScope = $rootScope;
		this.state = $state;
		this.timeout = $timeout;
		this.ChecklistService = ChecklistService;
		this.getAllChecklists();
		this.checklists = [];
		this.newChecklist = undefined;

		$scope.sortableConfig = {
			animation: 150,
			delay: 0,
			handle: ".handle",
			onUpdate: function () {
				// TODO filip(03/05/2016): ???complicated to save into db???
			}
		};
	}

	getAllChecklists() {
		this.ChecklistService
			.getChecklists(this.rootScope.user)
			.then(result => this.checklists = result.data)
			.catch(error => console.log('error checklist'));
	}

	addChecklist() {
		if (this.newChecklist) {
			this.ChecklistService
				.addChecklist(this.rootScope.user, this.newChecklist)
				.then(result => {
					this.checklists.push(result.data);
					this.newChecklist = undefined;
					this.closeAddForm();
				})
				.catch(error => console.log('error checklist'));
		}
	}

	deleteChecklist() {
		if (!this.checklistToDelete) {
			return;
		}

		let vm = this;
		this.ChecklistService
			.deleteChecklist(this.rootScope.user, this.checklistToDelete)
			.then(result => {
				vm.checklists = vm.checklists.filter(checklist => checklist !== vm.checklistToDelete);
				vm.closeModal();
			})
			.catch(error => console.log('error checklist'));
	}

	openAddForm() {
		this.activateAdd = true;
		this.focusOn('checklist-add');
	}

	focusOn(id) {
		let element = document.getElementById(id);
		if (element) {
			this.timeout(() => element.focus());
		}
	}

	closeAddForm() {
		this.activateAdd = false;
	}

	openModal(index) {
		let body = document.querySelector('body');
		let checklist = document.querySelector('.checklist');
		body.classList.add('modal-open');
		checklist.classList.add('blur');

		this.showModal = true;
		this.checklistToDelete = this.checklists[index];
	}

	closeModal() {
		let body = document.querySelector('body');
		let checklist = document.querySelector('.checklist');
		body.classList.remove('modal-open');
		checklist.classList.remove('blur');

		this.showModal = false;
		this.checklistToDelete = undefined;
	}
}

ChecklistController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'ChecklistService'];

export default ChecklistController;
