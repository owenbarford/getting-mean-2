import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupportAppDataService } from '../_services/index';
import { IPolicy } from '../_models/index';

@Component({
    selector: 'app-policy-edit',
    templateUrl: 'policy-edit.component.html',
    providers: [SupportAppDataService]
})

export class PolicyEditComponent implements OnInit {

    policy: IPolicy;
    editPolicyForm: FormGroup;
    returnUrl: string;
    loading = false;

    pageContent = {
        header: {
          title: 'Edit Policy',
          strapLine: 'Find information on the Support Team!'
        },
        sidebar: 'Looking for information on the Support Team? Find consultant information here using SupportApp.'
      };

    constructor(
        private route: ActivatedRoute,
        private supportAppDataService: SupportAppDataService,
        private router: Router,
    ) {
    }

    updatePolicy() {
        this.loading = true;
        this.supportAppDataService.updatePolicy(this.editPolicyForm.value)
            .then(
                data => {
                    console.log('Policy updated');
                    this.router.navigate(['/policies']);
                },
                error => {
                    console.log(error);
                    this.loading = false;
                });
    }

    ngOnInit() {
        this.route.paramMap
          .switchMap((params: ParamMap) => {
            const id = params.get('_id');
            return this.supportAppDataService.getPolicyById(id);
        })
        .subscribe((policy: IPolicy) => {
            const _id = new FormControl(policy._id);
            const title = new FormControl(policy.title, [Validators.required]);
            const policyText = new FormControl(policy.policyText, [Validators.required]);
            this.editPolicyForm = new FormGroup({
                title: title,
                policyText: policyText,
                _id: _id
            });
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      }

     cancel() {
        this.router.navigate(['']);
      }
}
